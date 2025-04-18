package turnos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "cambios")
@Data
@AllArgsConstructor
@EqualsAndHashCode(of = "idCambio")
@NoArgsConstructor
@Builder
public class Cambios implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cambio")
    private Integer idCambio;

    @ManyToOne
    @JoinColumn(name = "id_solicitante",nullable = false,referencedColumnName = "id_emp")
    private Empleado idSolicitante;  // Relación con la entidad Empleado

    @ManyToOne
    @JoinColumn(name = "id_concede", nullable = false, referencedColumnName = "id_emp")
    private Empleado idConcede;
    
    @Column(name = "fecha_solicitud")
    private LocalDate fechaSolicitud;

    @Column(name = "fecha_turno1")
    private LocalDate fechaTurno1;

    @Column(name = "fecha_turno2")
    private LocalDate fechaTurno2;
    
	@Enumerated(EnumType.STRING)
	private Estado estado;
	
	
}
