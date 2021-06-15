import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLoggerIn = false;

  return isUserLoggerIn ? (
    <button className={styles.signInButton}>
      <FaGithub
        color="#04d361"
      />
      Leonardo Leles
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButton}>
      <FaGithub
        color="#eba417"
      />
      Sign In with GitHub
    </button>
  );
}