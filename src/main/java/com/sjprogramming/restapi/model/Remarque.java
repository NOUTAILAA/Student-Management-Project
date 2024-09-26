package com.sjprogramming.restapi.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Remarque {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "eleve_id")
    @JsonIgnore
    private Eleve eleve;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Eleve getEleve() {
        return eleve;
    }

    public void setEleve(Eleve eleve) {
        this.eleve = eleve;
    }

    public Remarque() {}

    public Remarque(Long id, String content, Date date, Eleve eleve) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.eleve = eleve;
    }
}
