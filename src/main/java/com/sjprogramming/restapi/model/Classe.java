package com.sjprogramming.restapi.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "classe", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Eleve> eleves = new HashSet<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Eleve> getEleves() {
        return eleves;
    }

    public void setEleves(Set<Eleve> eleves) {
        this.eleves = eleves;
    }

    public Classe() {}

    public Classe(Long id, String name, String description, Set<Eleve> eleves) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.eleves = eleves;
    }
}
