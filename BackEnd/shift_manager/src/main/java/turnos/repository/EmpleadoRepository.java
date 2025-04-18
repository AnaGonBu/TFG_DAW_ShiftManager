package turnos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import turnos.entity.Empleado;
import turnos.entity.Grupo;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer>{
	List<Empleado> findByGrupo_IdGrupo(Integer idGrupo);
	List<Empleado> findByGrupo(Grupo grupo);
}
