package turnos.restcontroller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;


import turnos.dto.CambiosDto;
import turnos.entity.Cambios;
import turnos.entity.Estado;
import turnos.service.CambiosService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cambios")
@CrossOrigin(origins = "*") 
@Tag(name="Cambios", description ="Operaciones de cambios de turnos")
public class CambiosController {

    @Autowired
    private CambiosService cambioService;
    
    @Autowired
    private ModelMapper modelMapper;
    
    

    @Operation(summary = "Obtener todos los cambios", responses = {
            @ApiResponse(responseCode = "200", description = "Lista de cambios obtenida exitosamente",
                content = @Content(schema = @Schema(implementation = CambiosDto.class)))
        })
        @GetMapping
        public ResponseEntity<List<CambiosDto>> getAllCambios() {
            List<Cambios> cambios = cambioService.getAllCambios();
            List<CambiosDto> cambiosDto = cambios.stream()
                .map(c -> modelMapper.map(c, CambiosDto.class))
                .toList();
            return ResponseEntity.ok(cambiosDto);
        }


    @Operation(summary = "Obtener un cambio por ID", responses = {
            @ApiResponse(responseCode = "200", description = "Cambio encontrado",
                content = @Content(schema = @Schema(implementation = CambiosDto.class))),
            @ApiResponse(responseCode = "404", description = "Cambio no encontrado")
        })
        @GetMapping("/{id}")
        public ResponseEntity<CambiosDto> getCambioById(
            @Parameter(description = "ID del cambio a buscar") @PathVariable Integer id) {
            return cambioService.getCambioById(id)
                    .map(c -> ResponseEntity.ok(modelMapper.map(c, CambiosDto.class)))
                    .orElse(ResponseEntity.notFound().build());
        }


    
    @Operation(summary = "Crear un nuevo cambio", responses = {
            @ApiResponse(responseCode = "201", description = "Cambio creado exitosamente",
                content = @Content(schema = @Schema(implementation = CambiosDto.class)))
        })
    @PostMapping
    public ResponseEntity<CambiosDto> createCambio(@RequestBody CambiosDto cambioDto) {
        Cambios cambio = modelMapper.map(cambioDto, Cambios.class);

        if (cambio.getEstado() == null) {
            cambio.setEstado(Estado.PENDIENTE);
        }

        Cambios creado = cambioService.createCambio(cambio);
        CambiosDto respuesta = modelMapper.map(creado, CambiosDto.class);

        return new ResponseEntity<>(respuesta, HttpStatus.CREATED);
    } 


    
    @Operation(summary = "Actualizar un cambio existente", responses = {
            @ApiResponse(responseCode = "200", description = "Cambio actualizado correctamente",
                content = @Content(schema = @Schema(implementation = CambiosDto.class))),
            @ApiResponse(responseCode = "404", description = "Cambio no encontrado")
        })
        @PutMapping("/{id}")
        public ResponseEntity<CambiosDto> updateCambio(
            @Parameter(description = "ID del cambio a actualizar") @PathVariable Integer id,
            @Parameter(description = "Datos actualizados del cambio") @RequestBody CambiosDto cambioDto) {

            Optional<Cambios> existente = cambioService.getCambioById(id);
            if (existente.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Cambios cambio = modelMapper.map(cambioDto, Cambios.class);
            cambio.setIdCambio(id);
            Cambios actualizado = cambioService.updateCambio(id, cambio);
            CambiosDto respuesta = modelMapper.map(actualizado, CambiosDto.class);
            return ResponseEntity.ok(respuesta);
        }


    @Operation(summary = "Eliminar un cambio por ID", responses = {
            @ApiResponse(responseCode = "204", description = "Cambio eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Cambio no encontrado")
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteCambio(
            @Parameter(description = "ID del cambio a eliminar") @PathVariable Integer id) {
            if (cambioService.getCambioById(id).isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            cambioService.deleteCambio(id);
            return ResponseEntity.noContent().build();
        }
}
