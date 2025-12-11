package io.github.alizarazot.lasllavesdetucasa;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
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

  @Autowired private JavaMailSender emailSender;
  @Autowired private RealStateRepository realStateRepository;

  @GetMapping("/send-email/{id}")
  public void sendEmail(
      @PathVariable Long id,
      @RequestParam String date,
      @RequestParam String hour,
      @RequestParam String email) {
    System.out.println("Sending email: " + email);
    RealState realState = realStateRepository.findById(id).orElse(null);
    if (realState == null) {
      System.out.println("Not sending email: ID not found!");
      return;
    }
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("info@inmobix.localhost");
    message.setTo(email);
    message.setSubject("Appointment: " + realState.getTitle());
    message.setText(
        "Your appointment has been made, we'll call you to confirm your date ("
            + date
            + ", "
            + hour
            + ").");
    emailSender.send(message);

    SimpleMailMessage msgEmployee = new SimpleMailMessage();
    msgEmployee.setFrom("info@inmobix.localhost");
    msgEmployee.setTo(System.getenv("EMAIL_USERNAME"));
    msgEmployee.setSubject("Appointment: " + date + ", " + hour);
    msgEmployee.setText(
        "An appointment has been made: " + realState.getTitle() + "\n\n" + "From: " + email);
    emailSender.send(msgEmployee);
  }
}
