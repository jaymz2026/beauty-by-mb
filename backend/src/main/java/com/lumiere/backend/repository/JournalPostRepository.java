package com.lumiere.backend.repository;

import com.lumiere.backend.model.JournalPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalPostRepository extends JpaRepository<JournalPost, Long> {
}
