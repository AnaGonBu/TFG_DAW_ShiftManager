package turnos.restcontroller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import turnos.dto.GrupoDto;
import turnos.entity.Grupo;
import turnos.service.GrupoService;

@RestController
@RequestMapping("/grupos")
@CrossOrigin(origins = "*") 
@Tag(name="Grupos", description ="Operaciones de grupos")
public class GrupoController {

    @Autowired
    private GrupoService grupoService;
    
    @Autowired
    private ModelMapper modelMapper;
    


    

    @Operation(summary = "Crear un nuevo grupo", responses = {
        @ApiResponse(responseCode = "201", description = "Grupo creado correctamente",
            content = @Content(schema = @Schema(implementation = GrupoDto.class)))
    })
    @PostMapping("")
    public ResponseEntity<GrupoDto> createGrupo(@RequestBody GrupoDto dto) {

        // Validación: no debería venir ID en la creación
        if (dto.getIdGrupo() != null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(null); // O puedes lanzar una excepción custom
        }

        Grupo grupo = modelMapper.map(dto, Grupo.class);
        Grupo savedGrupo = grupoService.saveGrupo(grupo);

        GrupoDto responseDto = modelMapper.map(savedGrupo, GrupoDto.class);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }


    @Operation(summary = "Listar grupos", responses = {
            @ApiResponse(responseCode = "200", description = "Listado completo",
                    content = @Content(schema = @Schema(implementation = GrupoDto.class))),
            @ApiResponse(responseCode = "404", description = "No hay grupos")
        })
    @GetMapping("")
    public List<GrupoDto> listarTodos() {
        List<Grupo> grupos = grupoService.getAllGrupos();
        // Convertimos la lista de entidades a una lista de DTOs
        return grupos.stream()
                        .map(grupo -> modelMapper.map(grupo, GrupoDto.class))
                        .collect(Collectors.toList());
    }
    
    
    @Operation(summary = "Seleccionar grupo por id", responses = {
    	    @ApiResponse(responseCode = "200", description = "Grupo existe",
    	            content = @Content(schema = @Schema(implementation = GrupoDto.class))),
    	    @ApiResponse(responseCode = "404", description = "No existe grupo")
    	})
    	@GetMapping("/{id}")
    	public ResponseEntity<GrupoDto> getGrupoById(@Parameter(description = "ID del grupo buscado") @PathVariable Integer id) {
    	    Optional<Grupo> grupo = grupoService.getGrupoById(id);

    	    return grupo.map(g -> {
    	        GrupoDto dto = modelMapper.map(g, GrupoDto.class);
    	        return ResponseEntity.ok(dto);
    	    }).orElseGet(() -> ResponseEntity.notFound().build());
    	}
    

    @Operation(summary = "Actualizar un grupo por ID", responses = {
    	    @ApiResponse(responseCode = "200", description = "Grupo actualizado correctamente",
    	            content = @Content(schema = @Schema(implementation = GrupoDto.class))),
    	    @ApiResponse(responseCode = "400", description = "Datos inválidos"),
    	    @ApiResponse(responseCode = "404", description = "Grupo no encontrado")
    	})
    	@PutMapping("/{id}")
    	public ResponseEntity<GrupoDto> updateGrupo(
    	        @PathVariable Integer id,
    	        @RequestBody GrupoDto grupoDto) {

    	    try {
    	        Optional<Grupo> grupoExistente = grupoService.getGrupoById(id);

    	        if (grupoExistente.isEmpty()) {
    	            return ResponseEntity.notFound().build();
    	        }

    	        Grupo grupoActualizado = modelMapper.map(grupoDto, Grupo.class);
    	        grupoActualizado.setIdGrupo(id); // Aseguramos que el ID no se cambie

    	        Grupo actualizado = grupoService.updateGrupo(id, grupoActualizado);
    	        GrupoDto respuesta = modelMapper.map(actualizado, GrupoDto.class);

    	        return ResponseEntity.ok(respuesta);

    	    } catch (IllegalArgumentException e) {
    	        return ResponseEntity.badRequest().build();
    	    }
    	}
    
    /*no se pueden borrar grupos por id porque es PK
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupo(@PathVariable Integer id) {
        grupoService.deleteGrupo(id);
        return ResponseEntity.noContent().build();
    }*/
}
