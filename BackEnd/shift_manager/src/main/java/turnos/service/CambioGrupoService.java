package turnos.service;

import java.util.List;
import java.util.Optional;

import turnos.entity.CambioGrupo;


public interface CambioGrupoService {
	
    List<CambioGrupo> getAllCambios();

    Optional<CambioGrupo> getCambioById(Integer id);

    CambioGrupo createCambio(CambioGrupo cambioGrupo);

    CambioGrupo updateCambio(Integer id, CambioGrupo cambioGrupo);

    void deleteCambio(Integer id);

}
