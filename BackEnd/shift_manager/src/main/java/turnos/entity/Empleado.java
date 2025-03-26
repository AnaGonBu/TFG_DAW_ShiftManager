package turnos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "idEmp")
@Entity
@Table(name = "empleados")
@Data
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_emp")
    private Integer idEmp;

    private String nombre;

    private String apellidos;

    private String email;
    
    @Column(name = "url_imagen")
    private String imagen;

    private String domicilio;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    private String situacion;

    private Boolean estado;

    @ManyToOne
    @JoinColumn(name = "id_grupo")
    private Grupo grupo;
}
