package turnos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import turnos.entity.CambioGrupo;
import turnos.entity.Cambios;
import turnos.entity.Empleado;
import turnos.entity.Estado;
import turnos.entity.Grupo;
import turnos.repository.CambioGrupoRepository;
import turnos.repository.CambiosRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CambiosServiceImpl implements CambiosService {

    @Autowired
    private CambiosRepository cambioRepository;
    
    @Autowired
    private CambioGrupoRepository cambioGrupoRepo;

    @Override
    public List<Cambios> getAllCambios() {
        return cambioRepository.findAll();
    }

    @Override
    public Optional<Cambios> getCambioById(Integer id) {
        return cambioRepository.findById(id);
    }

    @Override
    public Cambios createCambio(Cambios cambio) {
        return cambioRepository.save(cambio);
    }

/*    @Override
    public Cambios updateCambio(Integer id, Cambios cambio) {
        if (cambioRepository.existsById(id)) {
            cambio.setIdCambio(id);
            return cambioRepository.save(cambio);
        }
        return null; // Si no existe el cambio
    }*/
    @Override
    public Cambios updateCambio(Integer id, Cambios cambio) {
        Optional<Cambios> existenteOpt = cambioRepository.findById(id);

        if (existenteOpt.isEmpty()) {
            throw new EntityNotFoundException("Cambio con ID " + id + " no encontrado");
        }

        Cambios existente = existenteOpt.get();
        Estado estadoAnterior = existente.getEstado();

        // Persistimos los cambios actualizados
        cambio.setIdCambio(id); // Importante mantener el mismo ID
        Cambios actualizado = cambioRepository.save(cambio);

        if (estadoAnterior != Estado.ACEPTADO && actualizado.getEstado() == Estado.ACEPTADO) {

            Empleado solicitante = actualizado.getIdSolicitante();
            Empleado concede = actualizado.getIdConcede();

            Grupo grupoSolicitante = solicitante.getGrupo();
            Grupo grupoConcede = concede.getGrupo();

            // Registro para el solicitante (cambia el día al del concede)
            CambioGrupo cambioSolicitante = new CambioGrupo();
            cambioSolicitante.setCambio(actualizado);
            cambioSolicitante.setEmpleado(solicitante);
            cambioSolicitante.setFecha(actualizado.getFechaTurno2()); // Turno que recibe
            cambioSolicitante.setGrupoOrigen(grupoSolicitante);
            cambioSolicitante.setGrupoDestino(grupoConcede);
            cambioGrupoRepo.save(cambioSolicitante);

            // Registro para el concede (cambia el día al del solicitante)
            CambioGrupo cambioConcede = new CambioGrupo();
            cambioConcede.setCambio(actualizado);
            cambioConcede.setEmpleado(concede);
            cambioConcede.setFecha(actualizado.getFechaTurno1()); // Turno que recibe
            cambioConcede.setGrupoOrigen(grupoConcede);
            cambioConcede.setGrupoDestino(grupoSolicitante);
            cambioGrupoRepo.save(cambioConcede);
        }

        return actualizado;
    }



    @Override
    public void deleteCambio(Integer id) {
        cambioRepository.deleteById(id);
    }
}
