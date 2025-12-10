package io.github.alizarazot.lasllavesdetucasa;

import java.util.ArrayList;

public record RealState(
    long id,
    String title,
    String description,
    long price,
    int bedrooms,
    int bathrooms,
    boolean hasParking,
    String address,
    ArrayList<String> pictures) {}
