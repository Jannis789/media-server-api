import { orm } from "../index";

// Create an EntityManager object to manage forks
const em = {
  get: () => {
    if (!orm) {
      throw new Error("ORM is not initialized. Ensure that 'orm' is properly set up before accessing 'EntityManager'.");
    }
    return orm.em.fork();
  },
};

export default em;