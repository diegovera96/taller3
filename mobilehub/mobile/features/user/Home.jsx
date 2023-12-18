import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';

export default function Home({ navigation }) {
  const [repos, setRepos] = useState([]);
  const gitToken = process.env.GIT_TOKEN;

  const getRepos = async () => {
    try {
      const repos = await axios.get("https://api.github.com/users/Dizkm8/repos", {
        headers: {
          'Authorization': `token ${gitToken}`
        }
      });
      const reposData = await Promise.all(repos.data.map(async repo => {
        const commitsResponse = await axios.get(repo.commits_url.replace('{/sha}', ''), {
          headers: {
            'Authorization': `token ${gitToken}`
          }
        });
        return {
          id: repo.id,
          name: repo.name,
          created_at: repo.created_at,
          commits: commitsResponse.data.length,
        };
      }));
      const sortedRepos = reposData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setRepos(sortedRepos);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <ScrollView style={styles.container} bounces={false}>
      <SafeAreaView style={styles.safeArea}>
        {repos.map(repo => (
          <View style={styles.repo} key={repo.id}>
            <Text style={styles.repoName}>Nombre: {repo.name}</Text>
            <Text style={styles.repoDate}>Creación: {dayjs(repo.created_at).format('DD/MM/YYYY')}</Text>
            <Text style={styles.repoCommits}>Commits: {repo.commits}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Repo', { repo: repo })}>
                <Text style={styles.buttonText}>Ir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </SafeAreaView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repo: {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    alignItems: 'center',
  },
  repoName: {
    fontWeight: 'bold',
  },
  repoDate: {
    fontStyle: 'italic',
  },
  repoCommits: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  button: {
    backgroundColor: '#4200bd',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});