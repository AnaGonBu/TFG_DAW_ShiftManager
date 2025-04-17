package turnos.restcontroller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import turnos.dto.EmpleadoDto;
import turnos.entity.Empleado;
import turnos.entity.Grupo;
import turnos.service.EmpleadoService;
import turnos.service.GrupoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/empleados")
@CrossOrigin(origins = "*")
@Tag(name= "Empleados", description = "Operaciones con empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;
    
    @Autowired
    private GrupoService grupoService;

    @Autowired
    private ModelMapper modelMapper;
    

    @Operation(summary = "Listar empleados", responses = {
            @ApiResponse(responseCode = "200", description = "Listado completo",
                    content = @Content(schema = @Schema(implementation = EmpleadoDto.class))),
            @ApiResponse(responseCode = "404", description = "No hay empleados")
        })
    @GetMapping("")
    public List<EmpleadoDto> listarTodos() {
        List<Empleado> empleados = empleadoService.listarTodos();
        // Convertimos la lista de entidades a una lista de DTOs
        return empleados.stream()
                        .map(empleado -> modelMapper.map(empleado, EmpleadoDto.class))
                        .collect(Collectors.toList());
    }
    
    @Operation(summary = "Buscar empleado por ID", responses = {
            @ApiResponse(responseCode = "200", description = "Empleado encontrado",
                    content = @Content(schema = @Schema(implementation = EmpleadoDto.class))),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
        })
        @GetMapping("{id}")
        public ResponseEntity<EmpleadoDto> buscarEmpleado(
            @Parameter(description = "ID del empleado") @PathVariable Integer id) {

            return empleadoService.buscarPorId(id)
                    .map(empleado -> {
                        EmpleadoDto dto = modelMapper.map(empleado, EmpleadoDto.class);
                        dto.setIdGrupo(empleado.getGrupo() != null ? empleado.getGrupo().getIdGrupo() : null);
                        return ResponseEntity.ok(dto);
                    })
                    .orElse(ResponseEntity.notFound().build());
        }



    @Operation(summary = "Crear un nuevo empleado", responses = {
            @ApiResponse(responseCode = "200", description = "Empleado creado correctamente",
                    content = @Content(schema = @Schema(implementation = EmpleadoDto.class)))
        })
        @PostMapping
        public ResponseEntity<EmpleadoDto> guardarEmpleado(
            @Parameter(description = "Datos del nuevo empleado") @RequestBody EmpleadoDto dto) {

            Empleado empleado = modelMapper.map(dto, Empleado.class);
            if (dto.getIdGrupo() != null) {
                Grupo grupo = grupoService.getGrupoById(dto.getIdGrupo())
                        .orElseThrow(() -> new RuntimeException("Grupo no encontrado con ID: " + dto.getIdGrupo()));
                empleado.setGrupo(grupo);
            }

            Empleado guardado = empleadoService.guardar(empleado);
            EmpleadoDto respuesta = modelMapper.map(guardado, EmpleadoDto.class);
            respuesta.setIdGrupo(guardado.getGrupo() != null ? guardado.getGrupo().getIdGrupo() : null);
            return ResponseEntity.ok(respuesta);
        }

    @Operation(summary = "Actualizar un empleado existente", responses = {
            @ApiResponse(responseCode = "200", description = "Empleado actualizado correctamente",
                    content = @Content(schema = @Schema(implementation = EmpleadoDto.class))),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
        })
    
    
        @PutMapping("{id}")
        public ResponseEntity<EmpleadoDto> actualizarEmpleado(
            @Parameter(description = "ID del empleado a actualizar") @PathVariable Integer id,
            @Parameter(description = "Datos actualizados del empleado") @RequestBody EmpleadoDto dto) {

            Optional<Empleado> existente = empleadoService.buscarPorId(id);

            if (existente.isPresent()) {
                Empleado empleadoActualizado = existente.get();

                empleadoActualizado.setNombre(dto.getNombre());
                empleadoActualizado.setApellidos(dto.getApellidos());
                empleadoActualizado.setEmail(dto.getEmail());
                empleadoActualizado.setImagen(dto.getImagen());
                empleadoActualizado.setDomicilio(dto.getDomicilio());
                empleadoActualizado.setFechaIngreso(dto.getFechaIngreso());
                empleadoActualizado.setFechaNacimiento(dto.getFechaNacimiento());
                empleadoActualizado.setSituacion(dto.getSituacion());
                empleadoActualizado.setEstado(dto.getEstado());

                if (dto.getIdGrupo() != null) {
                    Grupo grupo = grupoService.getGrupoById(dto.getIdGrupo())
                            .orElseThrow(() -> new RuntimeException("Grupo no encontrado con ID: " + dto.getIdGrupo()));
                    empleadoActualizado.setGrupo(grupo);
                } else {
                    empleadoActualizado.setGrupo(null);
                }

                Empleado actualizado = empleadoService.guardar(empleadoActualizado);
                EmpleadoDto respuesta = modelMapper.map(actualizado, EmpleadoDto.class);
                respuesta.setIdGrupo(actualizado.getGrupo() != null ? actualizado.getGrupo().getIdGrupo() : null);
                return ResponseEntity.ok(respuesta);
            } else {
                return ResponseEntity.notFound().build();
            }
        }


    
    @Operation(summary = "Eliminar un empleado por ID", responses = {
            @ApiResponse(responseCode = "200", description = "Empleado eliminado con éxito",
                content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
        })
        @DeleteMapping("{id}")
        public ResponseEntity<Map<String, Integer>> eliminarEmpleado(
                @Parameter(description = "ID del empleado a eliminar") @PathVariable Integer id) {
            empleadoService.eliminar(id);
            Map<String, Integer> response = new HashMap<>();
            response.put("idEmp", id);
            return ResponseEntity.ok(response);
        }
    
    @Operation(summary = "Listar empleados por ID de grupo", responses = {
            @ApiResponse(responseCode = "200", description = "Listado por grupo",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Empleado.class))),
            @ApiResponse(responseCode = "404", description = "No se encontraron empleados en ese grupo")
        })
        @GetMapping("/grupo/{idGrupo}")
        public List<Empleado> listarPorGrupo(
                @Parameter(description = "ID del grupo") @PathVariable Integer idGrupo) {
            return empleadoService.findByGrupoId(idGrupo);
        }
    
    @Operation(summary = "Actualizar estado del empleado (activo/inactivo)", responses = {
            @ApiResponse(responseCode = "200", description = "Estado actualizado",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Empleado.class))),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
        })
        @PutMapping("{id}/estado")
        public ResponseEntity<Empleado> actualizarEstado(
                @Parameter(description = "ID del empleado") @PathVariable Integer id) {
            Optional<Empleado> empleadoOpt = empleadoService.buscarPorId(id);
            Empleado empleado = empleadoOpt.get();
            empleado.setEstado(!empleado.getEstado());
            empleadoService.guardar(empleado);
            return ResponseEntity.ok(empleado);
        }
    
    
}
