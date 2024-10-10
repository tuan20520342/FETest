async function fetchData() {
  const url = "https://test-share.shub.edu.vn/api/intern-test/input";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

async function postResults(token, results) {
  const url = "https://test-share.shub.edu.vn/api/intern-test/output";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Response from server: ", data.message);
  } catch (error) {
    console.error(error.message);
  }
}

function prefixSums(arr) {
  const n = arr.length;
  const prefixSumsType1 = new Array(n).fill(0);
  const prefixSumsType2 = new Array(n).fill(0);

  prefixSumsType1[0] = arr[0];
  prefixSumsType2[0] = arr[0];

  for (let i = 1; i < n; i++) {
    prefixSumsType1[i] = prefixSumsType1[i - 1] + arr[i];
    prefixSumsType2[i] =
      prefixSumsType2[i - 1] + (i % 2 === 0 ? arr[i] : -arr[i]);
  }

  return { prefixSumsType1, prefixSumsType2 };
}

function handleQueries(queries, prefixSumsType1, prefixSumsType2) {
  const results = [];
  for (const query of queries) {
    const [l, r] = query.range;
    if (query.type === "1") {
      const result =
        l === 0
          ? prefixSumsType1[r]
          : prefixSumsType1[r] - prefixSumsType1[l - 1];
      results.push(result);
    } else if (query.type === "2") {
      let result =
        l === 0
          ? prefixSumsType2[r]
          : prefixSumsType2[r] - prefixSumsType2[l - 1];

      if (l % 2 !== 0) {
        result *= -1;
      }

      results.push(result);
    }
  }
  return results;
}

async function main() {
  const { token, data, query } = await fetchData();
  const { prefixSumsType1, prefixSumsType2 } = prefixSums(data);
  const results = handleQueries(query, prefixSumsType1, prefixSumsType2);
  console.log("Results: ", results);
  await postResults(token, results);
}

main();
