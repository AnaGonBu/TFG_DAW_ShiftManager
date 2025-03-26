package turnos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import turnos.entity.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer>{

}
