package io.github.alizarazot.lasllavesdetucasa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "realstates")
public class RealState {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String description;
  private long price;
  private int bedrooms;
  private int bathrooms;
  private boolean hasParking;
  private String address;

  private String picture; // your lone, majestic picture

  public RealState() {
    // JPA's forced participation trophy constructor.
  }

  // ===== GETTERS =====

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public long getPrice() {
    return price;
  }

  public int getBedrooms() {
    return bedrooms;
  }

  public int getBathrooms() {
    return bathrooms;
  }

  public boolean isHasParking() {
    return hasParking;
  }

  public String getAddress() {
    return address;
  }

  public String getPicture() {
    return picture;
  }
}
