package turnos.entity;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "idGrupo")
@Entity
@Table(name = "grupos")
@Data
public class Grupo {

    @Id
    @Column(name = "id_grupo")
    private Integer idGrupo;

    @Column(name = "nombre_grupo")
    private String nombreGrupo;

    @Column(name = "num_emp")
    private Integer numEmp;

    private String descripcion;

    private Boolean estado;
    
    @Column(name = "fecha_inicio")
    private Date fechaInicio;
    
    private Integer frecuencia;
}