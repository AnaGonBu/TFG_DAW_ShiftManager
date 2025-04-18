package turnos.entity;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cambios_grupo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CambioGrupo implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cambio_grupo")
    private Integer idCambioGrupo;

    @ManyToOne
    @JoinColumn(name = "id_cambio", nullable = false)
    private Cambios cambio;

    @ManyToOne
    @JoinColumn(name = "id_empleado", nullable = false)
    private Empleado empleado;

    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "id_grupo_origen")
    private Grupo grupoOrigen;

    @ManyToOne
    @JoinColumn(name = "id_grupo_destino")
    private Grupo grupoDestino;
}
