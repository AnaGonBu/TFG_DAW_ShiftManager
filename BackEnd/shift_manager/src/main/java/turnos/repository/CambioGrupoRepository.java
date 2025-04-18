package turnos.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import turnos.entity.CambioGrupo;

public interface CambioGrupoRepository extends JpaRepository <CambioGrupo, Integer>{
	List<CambioGrupo> findByFecha(LocalDate fecha);

}
