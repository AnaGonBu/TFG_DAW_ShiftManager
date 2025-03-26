package turnos.service;

import java.util.List;
import java.util.Optional;

import turnos.entity.Empleado;

public interface EmpleadoService {
    List<Empleado> listarTodos();
    Optional<Empleado> buscarPorId(Integer id);
    Empleado guardar(Empleado empleado);
    void eliminar(Integer id);
}
