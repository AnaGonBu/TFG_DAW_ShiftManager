package turnos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import turnos.entity.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer>{
	List<Empleado> findByGrupo_IdGrupo(Integer idGrupo);
}
