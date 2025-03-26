package turnos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "cambios")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cambios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cambio")
    private Integer idCambio;

    @ManyToOne
    @JoinColumn(name = "id_solicitante", referencedColumnName = "id_emp")
    private Empleado solicitante;  // Relación con la entidad Empleado

    private Integer idConcede;
    
    @Column(name = "fecha_solicitud")
    private LocalDate fechaSolicitud;

    @Column(name = "fecha_turno1")
    private LocalDate fechaTurno1;

    @Column(name = "fecha_turno2")
    private LocalDate fechaTurno2;
}
