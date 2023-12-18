import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';

const Repo = ({ route }) => {
  const { repo } = route.params;
  const [commits, setCommits] = useState([]);
  const gitToken = process.env.GIT_TOKEN;


  const getCommits = async () => {
    try {
      const response = await axios.get(`https://api.github.com/repos/Dizkm8/${repo.name}/commits`, {
        headers: {
            'Authorization': `token ${gitToken}`
        }
        });
      const sortedCommits = response.data.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));
      setCommits(sortedCommits);
    } catch (e) {
      console.log("error", e);
    }
  };


  useEffect(() => {
    getCommits();
  }, []);

  return (
    <ScrollView style={styles.container} bounces={false}>
      <SafeAreaView style={styles.safeArea}>
            <View style={styles.repo}>
                <Text style={styles.repoName}>Nombre repositorio: {repo.name}</Text>
                <Text style={styles.repoDate}>Fecha creación: {dayjs(repo.created_at).format('DD/MM/YYYY')}</Text>
                <Text style={styles.repoCommits}>Commits totales: {repo.commits}</Text>
                {commits.map(commit => (
                    <View style={styles.repoCommitBox} key={commit.sha}>
                        <Text style={styles.repoCommit}>{commit.commit.message}</Text>
                        <Text style={styles.repoDate}>{dayjs(commit.commit.author.date).format('DD/MM/YYYY')}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    </ScrollView>
  );
};

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
    repoCommitBox: {
        margin: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 1,
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
    repoCommit: {
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

export default Repo;