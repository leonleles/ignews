import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signout, useSession } from "next-auth/client";

import styles from "./styles.module.scss";

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <button className={styles.signInButton}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX
        color="#737380"
        className={styles.closeIcon}
        onClick={() => signout()}
      />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      onClick={() => {
        signIn("github");
      }}
    >
      <FaGithub color="#eba417" />
      Sign In with GitHub
    </button>
  );
}
