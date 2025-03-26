package turnos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import turnos.entity.Grupo;
import turnos.repository.GrupoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GrupoServiceImpl implements GrupoService {

    @Autowired
    private GrupoRepository grupoRepository;

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
