package turnos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import turnos.entity.Cambios;

@Repository
public interface CambiosRepository extends JpaRepository<Cambios, Integer> {
	
}
