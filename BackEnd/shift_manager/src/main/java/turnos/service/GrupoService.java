package turnos.service;

import turnos.entity.Grupo;
import java.util.List;
import java.util.Optional;

public interface GrupoService {
    Grupo saveGrupo(Grupo grupo);
    List<Grupo> getAllGrupos();
    Optional<Grupo> getGrupoById(Integer id);
    Grupo updateGrupo(Integer id, Grupo grupo);
    void deleteGrupo(Integer id);
}
