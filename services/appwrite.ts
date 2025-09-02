import { Client, Databases, ID, Query } from "react-native-appwrite";
const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DB_ID, "metrics", [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(DB_ID, "metrics", existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DB_ID, "metrics", ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DB_ID, "metrics", [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    throw error;
  }
};

export const saveMovie = async (movie: MovieDetails) => {
  try {
    await database.createDocument(DB_ID, "saved", ID.unique(), {
      movie_id: movie.id,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      title: movie.title,
    });
  } catch (error) {
    throw error;
  }
};

export const checkMovieSaved = async (movie_id: number): Promise<boolean> => {
  try {
    const result = await database.listDocuments(DB_ID, "saved", [
      Query.equal("movie_id", movie_id),
    ]);

    return result.documents.length > 0;
  } catch (error) {
    throw error;
  }
};

export const unsaveMovie = async (movie_id: number) => {
  try {
    const result = await database.listDocuments(DB_ID, "saved", [
      Query.equal("movie_id", movie_id),
    ]);

    if (result.documents.length > 0) {
      await database.deleteDocument(DB_ID, "saved", result.documents[0].$id);
    }
  } catch (error) {
    throw error;
  }
};

export const getSavedMovies = async (): Promise<SavedMovie[]> => {
  try {
    const result = await database.listDocuments(DB_ID, "saved", [
      Query.limit(100),
    ]);

    return result.documents as unknown as SavedMovie[];
  } catch (error) {
    throw error;
  }
};
