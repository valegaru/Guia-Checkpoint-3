// el nombre bajo el cual va a aparecer lo que guardemos en el local storage
export enum PersistanceKeys {
  "STORE" = "STORE",
}

//obtener lo que haya en el local storage
const get = ({ key, defaultValue}: { key: PersistanceKeys; defaultValue: unknown;}) => {
  const value = localStorage.getItem(key) || sessionStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

//guardar lo que haya en el local storage
//como session comienza en falso, lo manda al local al menos de que se le diga que session es true
const set = ({ key, value, session=false}: { key: PersistanceKeys; value: unknown; session:boolean}) => {
  //si session es verdad se guarda en el session storage sino se guarda en el local
  const storage = session ? sessionStorage : localStorage;
  const parsed= JSON.stringify(value)
 storage.setItem(key,parsed)
};

export default {
  get,
  set,
};

