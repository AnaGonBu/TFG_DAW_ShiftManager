package turnos.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import turnos.entity.Empleado;
import turnos.repository.EmpleadoRepository;
import turnos.service.EmpleadoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/empleados")
@CrossOrigin(origins = "*") 
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @GetMapping
    public List<Empleado> listarEmpleados() {
        return empleadoService.listarTodos();
    }

    @GetMapping("{id}")
    public Optional<Empleado> buscarEmpleado(@PathVariable Integer id) {
        return empleadoService.buscarPorId(id);
    }

    @PostMapping
    public Empleado guardarEmpleado(@RequestBody Empleado empleado) {
        return empleadoService.guardar(empleado);
    }

    @PutMapping("{id}")
    public Empleado actualizarEmpleado(@RequestBody Empleado empleado, @PathVariable Integer id) {
        Optional<Empleado> empleadoExistente = empleadoService.buscarPorId(id);

        if (empleadoExistente.isPresent()) {
            Empleado empleadoActualizado = empleadoExistente.get();
            empleadoActualizado.setNombre(empleado.getNombre());
            empleadoActualizado.setApellidos(empleado.getApellidos());
            empleadoActualizado.setEmail(empleado.getEmail());
            empleadoActualizado.setImagen(empleado.getImagen());
            empleadoActualizado.setDomicilio(empleado.getDomicilio());
            empleadoActualizado.setFechaIngreso(empleado.getFechaIngreso());
            empleadoActualizado.setFechaNacimiento(empleado.getFechaNacimiento());
            empleadoActualizado.setSituacion(empleado.getSituacion());
            empleadoActualizado.setEstado(empleado.getEstado());
            empleadoActualizado.setGrupo(empleado.getGrupo());
            return empleadoService.guardar(empleadoActualizado);
        } else {
            throw new RuntimeException("Empleado no encontrado con el ID: " + id);
        }
    }

    /** metodo de borrar sin devolver nada
    @DeleteMapping("{id}")
    public void eliminarEmpleado(@PathVariable Integer id) {
        empleadoService.eliminar(id);
    }*/
    
    //Así devuelve el id del empleado eliminado para usarlo en el front
    @DeleteMapping("{id}")
    public ResponseEntity<Map<String, Integer>> eliminarEmpleado(@PathVariable Integer id) {
        empleadoService.eliminar(id);
        Map<String, Integer> response = new HashMap<>();
        response.put("idEmp", id);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/grupo/{idGrupo}")
    public List<Empleado> listarPorGrupo(@PathVariable Integer idGrupo) {
        return empleadoService.findByGrupoId(idGrupo);
    }
    
    @PutMapping("{id}/estado")
    public ResponseEntity<Empleado> actualizarEstado(@PathVariable Integer id) {
        Optional<Empleado> empleadoOpt = empleadoService.buscarPorId(id);

        Empleado empleado = empleadoOpt.get();
        empleado.setEstado(!empleado.getEstado());
        empleadoService.guardar(empleado);
        return ResponseEntity.ok(empleado);
    }
    
    
}
