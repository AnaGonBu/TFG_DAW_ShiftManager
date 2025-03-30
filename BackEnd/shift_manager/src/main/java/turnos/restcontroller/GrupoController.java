package turnos.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import turnos.entity.Grupo;
import turnos.service.GrupoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/grupos")
@CrossOrigin(origins = "*") 
public class GrupoController {

    @Autowired
    private GrupoService grupoService;

    @PostMapping
    public ResponseEntity<Grupo> createGrupo(@RequestBody Grupo grupo) {
        Grupo savedGrupo = grupoService.saveGrupo(grupo);
        return new ResponseEntity<>(savedGrupo, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Grupo> getAllGrupos() {
        return grupoService.getAllGrupos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Grupo> getGrupoById(@PathVariable Integer id) {
        Optional<Grupo> grupo = grupoService.getGrupoById(id);
        return grupo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grupo> updateGrupo(@PathVariable Integer id, @RequestBody Grupo grupo) {
        try {
            Grupo updatedGrupo = grupoService.updateGrupo(id, grupo);
            return updatedGrupo != null ? ResponseEntity.ok(updatedGrupo) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    //no se pueden borrar grupos por id porque es FK
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupo(@PathVariable Integer id) {
        grupoService.deleteGrupo(id);
        return ResponseEntity.noContent().build();
    }
}
