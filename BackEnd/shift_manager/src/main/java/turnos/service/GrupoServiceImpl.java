package turnos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import turnos.entity.CambioGrupo;
import turnos.entity.Empleado;
import turnos.entity.Grupo;
import turnos.repository.CambioGrupoRepository;
import turnos.repository.EmpleadoRepository;
import turnos.repository.GrupoRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GrupoServiceImpl implements GrupoService {

    @Autowired
    private GrupoRepository grupoRepository;
    
    @Autowired
    private EmpleadoRepository empleadoRepository;
    
    @Autowired
    private CambioGrupoRepository cambioGrupoRepository;
    
    
    @Override
    public Map<Grupo, List<Empleado>> getGruposConMiembrosParaFecha(LocalDate fecha) {
        Map<Grupo, List<Empleado>> gruposConMiembrosFinal = new HashMap<>();

        // 1. Obtener todos los grupos
        List<Grupo> todosLosGrupos = grupoRepository.findAll();

        // 2. Determinar qué grupos tienen turno en la 'fecha' dada y quiénes son sus miembros base
        Map<Grupo, List<Empleado>> gruposConTurnoHoyBase = new HashMap<>();

        for (Grupo grupo : todosLosGrupos) {
            if (grupoTieneTurnoEnFecha(grupo, fecha)) {
                // Este grupo SÍ tiene turno hoy. Obtener sus miembros permanentes.
                List<Empleado> miembrosPermanentes = empleadoRepository.findByGrupo(grupo);
                gruposConTurnoHoyBase.put(grupo, new ArrayList<>(miembrosPermanentes));
            } else {
                // Este grupo NO tiene turno hoy, inicialmente no tiene empleados.
                // Lo añadimos para que los cambios puedan mover gente aquí si es necesario,
                // pero su lista base de empleados hoy es vacía.
                gruposConTurnoHoyBase.put(grupo, new ArrayList<>());
            }
        }

        // 3. Obtener los registros de CambioGrupo para la 'fecha' dada
        List<CambioGrupo> cambiosDelDia = cambioGrupoRepository.findByFecha(fecha);

        // 4. Aplicar los cambios sobre 'gruposConTurnoHoyBase'
        for (CambioGrupo cambio : cambiosDelDia) {
            Empleado empleadoMovido = cambio.getEmpleado();
            Grupo grupoOrigenDelCambio = cambio.getGrupoOrigen();   // El grupo que el empleado DEJA (según el registro de cambio)
            Grupo grupoDestinoDelCambio = cambio.getGrupoDestino(); // El grupo al que el empleado VA (según el registro de cambio)

            // Quitar al empleado del grupo origen DEL CAMBIO (si existe en nuestro mapa de turnos de hoy)
            if (grupoOrigenDelCambio != null && gruposConTurnoHoyBase.containsKey(grupoOrigenDelCambio)) {
                gruposConTurnoHoyBase.get(grupoOrigenDelCambio).remove(empleadoMovido);
            }

            // Añadir al empleado al grupo destino DEL CAMBIO (si existe en nuestro mapa de turnos de hoy)
            // o si es un grupo válido y queremos registrar que alguien cubre ahí aunque no tuviera turno.
            // Esta parte es delicada: ¿puede un empleado cubrir en un grupo que NO tenía turno?
            // Si es así, el computeIfAbsent es correcto.
            if (grupoDestinoDelCambio != null) {
                 List<Empleado> empleadosEnDestino = gruposConTurnoHoyBase.computeIfAbsent(grupoDestinoDelCambio, k -> new ArrayList<>());
                 if (!empleadosEnDestino.contains(empleadoMovido)) { // Evitar duplicados
                     empleadosEnDestino.add(empleadoMovido);
                 }
            }
        }
        
        // 5. Filtrar el resultado final para incluir solo grupos que terminaron con empleados
        // o todos los grupos que tenían turno, incluso si quedaron vacíos.
        // Por simplicidad, devolvemos todos los que estaban en gruposConTurnoHoyBase.
        // Si un grupo tenía turno pero quedó vacío por cambios, se devolverá con lista vacía.
        // Si un grupo NO tenía turno pero alguien cubrió, se devolverá con esa persona.
        return gruposConTurnoHoyBase;
    }

    /**
     * Verifica si un grupo tiene turno en una fecha específica basado en su
     * fecha de inicio y frecuencia.
     * Asume que grupo.getFechaInicio() devuelve java.sql.Date.
     * Asume que fechaAConsultar es java.time.LocalDate.
     */
    private boolean grupoTieneTurnoEnFecha(Grupo grupo, LocalDate fechaAConsultar) {
        if (grupo.getFechaInicio() == null || grupo.getFrecuencia() == null || grupo.getFrecuencia() <= 0) {
            return false;
        }

        // 1. Convertir java.sql.Date (de la BD/entidad) a java.time.LocalDate
        // java.sql.Date tiene un método directo toLocalDate()
        Date sqlDateFechaInicio = grupo.getFechaInicio(); // Asegúrate que el getter devuelva java.sql.Date
        LocalDate localDateFechaInicioDelGrupo = sqlDateFechaInicio.toLocalDate();


        // 2. Comparar y calcular la diferencia usando LocalDate
        if (fechaAConsultar.isBefore(localDateFechaInicioDelGrupo)) {
            return false;
        }

        long diasDiferencia = ChronoUnit.DAYS.between(localDateFechaInicioDelGrupo, fechaAConsultar);

        return diasDiferencia % grupo.getFrecuencia() == 0;
    }

    
  /*  
    public Map<Grupo, List<Empleado>> getGruposConMiembrosParaFecha(LocalDate fecha) {
        // Obtener todos los grupos activos
        List<Grupo> grupos = grupoRepository.findAll();

        // Obtener todos los empleados activos por grupo
        Map<Grupo, List<Empleado>> grupoBase = new HashMap<>();
        for (Grupo grupo : grupos) {
            List<Empleado> empleados = empleadoRepository.findByGrupo(grupo);
            grupoBase.put(grupo, new ArrayList<>(empleados)); // usamos copia mutable
        }

        // Obtener todos los cambios de grupo para esa fecha
        List<CambioGrupo> cambiosDelDia = cambioGrupoRepository.findByFecha(fecha);

        for (CambioGrupo cambio : cambiosDelDia) {
            Grupo origen = cambio.getGrupoOrigen();
            Grupo destino = cambio.getGrupoDestino();
            Empleado empleado = cambio.getEmpleado();

            // El empleado se quita del grupo origen
            grupoBase.getOrDefault(origen, new ArrayList<>()).remove(empleado);
            // El empleado se añade al grupo destino
            grupoBase.computeIfAbsent(destino, k -> new ArrayList<>()).add(empleado);
        }

        return grupoBase;
    }*/

    @Override
    public Grupo saveGrupo(Grupo grupo) {
        return grupoRepository.save(grupo);
    }

    @Override
    public List<Grupo> getAllGrupos() {
        return grupoRepository.findAll();
    }

    @Override
    public Optional<Grupo> getGrupoById(Integer id) {
        return grupoRepository.findById(id);
    }

    @Override
    public Grupo updateGrupo(Integer id, Grupo grupo) {
        if (grupoRepository.existsById(id)) {
            // Solo actualizamos el grupo si el id de la URL coincide con el id del objeto
            if (!id.equals(grupo.getIdGrupo())) {
                throw new IllegalArgumentException("El ID en la URL no coincide con el ID del grupo a actualizar");
            }

            // Aquí se omite la actualización del ID, solo se actualizan otras propiedades
            grupo.setIdGrupo(id);  // Esto asegura que no cambie el id en el cuerpo de la solicitud

            return grupoRepository.save(grupo);
        }
        return null;  // Si el grupo no existe, puedes lanzar una excepción o devolver null
    }

    @Override
    public void deleteGrupo(Integer id) {
        grupoRepository.deleteById(id);
    }
}
