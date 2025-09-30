"use client";

import { useState } from 'react';
import { fitnessPlansAPI, testAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const APITestPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Test Hello API
  const testHelloAPI = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await testAPI.hello();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test POST API
  const testPostAPI = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await testAPI.sendData({
        name: 'CodeFlex User',
        action: 'test POST request'
      });
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Fitness Plans API
  const testFitnessPlansAPI = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fitnessPlansAPI.getAll();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new fitness plan
  const createTestPlan = async () => {
    setLoading(true);
    setError('');
    try {
      const newPlan = {
        name: 'Test Workout Plan',
        workoutPlan: {
          schedule: ['Monday', 'Wednesday', 'Friday'],
          exercises: [
            {
              day: 'Monday',
              routines: [
                { name: 'Push-ups', sets: 3, reps: 15, description: 'Standard push-ups' },
                { name: 'Squats', sets: 3, reps: 20, description: 'Bodyweight squats' }
              ]
            }
          ]
        },
        dietPlan: {
          dailyCalories: 2200,
          meals: [
            {
              name: 'Breakfast',
              foods: ['Oatmeal with berries', 'Greek yogurt', 'Coffee']
            },
            {
              name: 'Lunch',
              foods: ['Grilled chicken', 'Brown rice', 'Vegetables']
            }
          ]
        },
        isActive: true
      };

      const result = await fitnessPlansAPI.create(newPlan);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">API Testing Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button onClick={testHelloAPI} disabled={loading}>
          Test Hello API (GET)
        </Button>
        
        <Button onClick={testPostAPI} disabled={loading}>
          Test POST API
        </Button>
        
        <Button onClick={testFitnessPlansAPI} disabled={loading}>
          Get Fitness Plans
        </Button>
        
        <Button onClick={createTestPlan} disabled={loading}>
          Create Test Plan
        </Button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      )}

      {error && (
        <Card className="p-4 mb-4 border-red-500 bg-red-50">
          <h3 className="text-red-700 font-bold">Error:</h3>
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      {data && (
        <Card className="p-4">
          <h3 className="font-bold mb-2">API Response:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
};

export default APITestPage;