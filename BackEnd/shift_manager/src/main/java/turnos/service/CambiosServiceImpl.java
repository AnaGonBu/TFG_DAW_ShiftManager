package turnos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import turnos.entity.Cambios;
import turnos.repository.CambiosRepository;


import java.util.List;
import java.util.Optional;

@Service
public class CambiosServiceImpl implements CambiosService {

    @Autowired
    private CambiosRepository cambioRepository;

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

    @Override
    public Cambios updateCambio(Integer id, Cambios cambio) {
        if (cambioRepository.existsById(id)) {
            cambio.setIdCambio(id);
            return cambioRepository.save(cambio);
        }
        return null; // Si no existe el cambio
    }

    @Override
    public void deleteCambio(Integer id) {
        cambioRepository.deleteById(id);
    }
}
