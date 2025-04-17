package turnos.configuracion;


import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import turnos.dto.CambioGrupoDto;
import turnos.dto.CambiosDto;
import turnos.dto.EmpleadoDto;
import turnos.entity.CambioGrupo;
import turnos.entity.Cambios;
import turnos.entity.Empleado;


@Configuration
public class SpingConfig {

    @Bean
    ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Mapeo de CambioGrupo a CambioGrupoDto con solo los IDs de las entidades relacionadas
        TypeMap<CambioGrupo, CambioGrupoDto> cambioGrupoMap = modelMapper.createTypeMap(CambioGrupo.class, CambioGrupoDto.class);
        cambioGrupoMap.addMappings(mapper -> {
            // Mapeo de los IDs de las entidades relacionadas
            mapper.map(src -> src.getCambio().getIdCambio(), CambioGrupoDto::setIdCambio);
            mapper.map(src -> src.getEmpleado().getIdEmp(), CambioGrupoDto::setIdEmpleado);
            mapper.map(src -> src.getGrupoOrigen() != null ? src.getGrupoOrigen().getIdGrupo() : null, CambioGrupoDto::setIdGrupoOrigen);
            mapper.map(src -> src.getGrupoDestino() != null ? src.getGrupoDestino().getIdGrupo() : null, CambioGrupoDto::setIdGrupoDestino);
        });

        // Mapeo de Empleado a EmpleadoDto con solo los IDs de las entidades relacionadas
        TypeMap<Empleado, EmpleadoDto> empleadoMap = modelMapper.createTypeMap(Empleado.class, EmpleadoDto.class);
        empleadoMap.addMappings(mapper -> {
            mapper.map(Empleado::getIdEmp, EmpleadoDto::setIdEmp);
            mapper.map(Empleado::getNombre, EmpleadoDto::setNombre);
            mapper.map(Empleado::getApellidos, EmpleadoDto::setApellidos);
            mapper.map(Empleado::getSituacion, EmpleadoDto::setSituacion);
            mapper.map(Empleado::getEstado, EmpleadoDto::setEstado);
            
            
        });

        // Mapeo de Cambios a CambiosDto con solo los IDs de las entidades relacionadas
        TypeMap<Cambios, CambiosDto> cambioMap = modelMapper.createTypeMap(Cambios.class, CambiosDto.class);
        cambioMap.addMappings(mapper -> {
            mapper.map(Cambios::getIdCambio, CambiosDto::setIdCambio);
            mapper.map(Cambios::getFechaSolicitud, CambiosDto::setFechaSolicitud);
            mapper.map(Cambios::getFechaTurno1, CambiosDto::setFechaTurno1);
            mapper.map(Cambios::getFechaTurno2, CambiosDto::setFechaTurno2);
            mapper.map(src -> src.getSolicitante() != null ? src.getSolicitante().getIdEmp() : null, CambiosDto::setIdSolicitante);
            mapper.map(src -> src.getIdConcede() != null ? src.getIdConcede() : null, CambiosDto::setIdConcede);
        });

        return modelMapper;
    }
}
