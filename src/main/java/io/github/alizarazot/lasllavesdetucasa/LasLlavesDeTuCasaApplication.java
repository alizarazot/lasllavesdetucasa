package io.github.alizarazot.lasllavesdetucasa;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class LasLlavesDeTuCasaApplication {

  public static void main(String[] args) {
    SpringApplication.run(LasLlavesDeTuCasaApplication.class, args);
  }

  @GetMapping("/home")
  public void redirectHome(HttpServletResponse response) throws IOException {
    response.sendRedirect("/");
  }
}
