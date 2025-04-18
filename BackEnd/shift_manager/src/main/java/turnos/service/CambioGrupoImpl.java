package turnos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import turnos.entity.CambioGrupo;
import turnos.repository.CambioGrupoRepository;

public class CambioGrupoImpl implements CambioGrupoService{
	
	@Autowired
	private CambioGrupoRepository cambioGrupoRepo;

	@Override
	public List<CambioGrupo> getAllCambios() {
		
		return cambioGrupoRepo.findAll();
	}

	@Override
	public Optional<CambioGrupo> getCambioById(Integer id) {
		
		return cambioGrupoRepo.findById(id);
	}

	@Override
	public CambioGrupo createCambio(CambioGrupo cambioGrupo) {
		
		return cambioGrupoRepo.save(cambioGrupo);
	}

	@Override
	public CambioGrupo updateCambio(Integer id, CambioGrupo cambioGrupo) {
        if (cambioGrupoRepo.existsById(id)) {
        	cambioGrupo.setIdCambioGrupo(id);
            return cambioGrupoRepo.save(cambioGrupo);
        }
        return null; // Si no existe el cambio
    }

	@Override
	public void deleteCambio(Integer id) {
		
		cambioGrupoRepo.deleteById(id);
		
	}

}
