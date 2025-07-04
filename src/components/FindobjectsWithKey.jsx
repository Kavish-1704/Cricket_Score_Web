function findObjectsWithKey(obj, keyToFind) {
    let results = [];
  
    function search(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) search(item);
      } else if (typeof obj === 'object' && obj !== null) {
        if (keyToFind in obj) {
          results.push(obj);
        }
        for (const key in obj) {
          search(obj[key]);
        }
      }
    }
  
    search(obj);
    return results;
  }