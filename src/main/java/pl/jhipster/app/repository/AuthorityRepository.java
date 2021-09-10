package pl.jhipster.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jhipster.app.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
