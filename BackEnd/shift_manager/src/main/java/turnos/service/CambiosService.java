package turnos.service;

import turnos.entity.Cambios;
import java.util.List;
import java.util.Optional;

public interface CambiosService {

    List<Cambios> getAllCambios();

    Optional<Cambios> getCambioById(Integer id);

    Cambios createCambio(Cambios cambio);

    Cambios updateCambio(Integer id, Cambios cambio);

    void deleteCambio(Integer id);
}
