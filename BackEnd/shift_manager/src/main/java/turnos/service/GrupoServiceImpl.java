package turnos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import turnos.entity.CambioGrupo;
import turnos.entity.Empleado;
import turnos.entity.Grupo;
import turnos.repository.CambioGrupoRepository;
import turnos.repository.EmpleadoRepository;
import turnos.repository.GrupoRepository;

import java.time.LocalDate;
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
    }

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
