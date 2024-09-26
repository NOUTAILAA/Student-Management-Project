package com.sjprogramming.restapi.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sujet;
    private String description;
    private Date dateCreation;

    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;

    @Column(nullable = false)
    private String state = "en cours";  // Default value

    private String causeRefus;  // Ajout du champ cause de refus

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Eleve getEleve() {
        return eleve;
    }

    public void setEleve(Eleve eleve) {
        this.eleve = eleve;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCauseRefus() {
        return causeRefus;
    }

    public void setCauseRefus(String causeRefus) {
        this.causeRefus = causeRefus;
    }

    public Demande() {}

    public Demande(Long id, String sujet, String description, Date dateCreation, Eleve eleve, String state, String causeRefus) {
        this.id = id;
        this.sujet = sujet;
        this.description = description;
        this.dateCreation = dateCreation;
        this.eleve = eleve;
        this.state = state;
        this.causeRefus = causeRefus;
    }
}
