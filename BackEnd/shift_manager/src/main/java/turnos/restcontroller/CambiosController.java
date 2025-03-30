package turnos.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import turnos.entity.Cambios;
import turnos.service.CambiosService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cambios")
@CrossOrigin(origins = "*") 
public class CambiosController {

    @Autowired
    private CambiosService cambioService;

    // Obtener todos los cambios
    @GetMapping
    public ResponseEntity<List<Cambios>> getAllCambios() {
        List<Cambios> cambios = cambioService.getAllCambios();
        return new ResponseEntity<>(cambios, HttpStatus.OK);
    }

    // Obtener un cambio por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cambios> getCambioById(@PathVariable Integer id) {
        Optional<Cambios> cambio = cambioService.getCambioById(id);
        return cambio.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo cambio
    @PostMapping
    public ResponseEntity<Cambios> createCambio(@RequestBody Cambios cambio) {
        Cambios createdCambio = cambioService.createCambio(cambio);
        return new ResponseEntity<>(createdCambio, HttpStatus.CREATED);
    }

    // Actualizar un cambio existente
    @PutMapping("/{id}")
    public ResponseEntity<Cambios> updateCambio(@PathVariable Integer id, @RequestBody Cambios cambio) {
        Cambios updatedCambio = cambioService.updateCambio(id, cambio);
        return updatedCambio != null ? new ResponseEntity<>(updatedCambio, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Eliminar un cambio por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCambio(@PathVariable Integer id) {
        cambioService.deleteCambio(id);
        return ResponseEntity.noContent().build();
       // return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }
}
