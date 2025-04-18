package turnos.service;

import turnos.entity.Empleado;
import turnos.entity.Grupo;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface GrupoService {
    Grupo saveGrupo(Grupo grupo);
    List<Grupo> getAllGrupos();
    Optional<Grupo> getGrupoById(Integer id);
    Grupo updateGrupo(Integer id, Grupo grupo);
    void deleteGrupo(Integer id);
    Map<Grupo, List<Empleado>> getGruposConMiembrosParaFecha(LocalDate fecha);
}
