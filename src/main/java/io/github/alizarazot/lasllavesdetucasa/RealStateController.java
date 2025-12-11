package io.github.alizarazot.lasllavesdetucasa;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RealStateController {
  @Autowired private RealStateRepository realStateRepository;

  @GetMapping("/real-states")
  public List<RealState> realState() {
    return realStateRepository.findAll();
  }

  @GetMapping("/real-state/{id}")
  public RealState getRealStateById(@PathVariable Long id) {
    return realStateRepository.findById(id).orElse(null);
  }
}
