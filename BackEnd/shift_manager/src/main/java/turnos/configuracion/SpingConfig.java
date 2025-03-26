package turnos.configuracion;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpingConfig {

	@Bean
	ModelMapper getModelMapper() {
		return new ModelMapper();
	}
	
	
}
