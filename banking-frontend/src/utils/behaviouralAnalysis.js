class BehavioralAnalysis {
  constructor() {
    this.keyPresses = [];
    this.startTime = 0;
    this.loginAttempts = [];
  }

  startTracking() {
    this.startTime = Date.now();
    this.keyPresses = [];
  }

  recordKeyPress(key) {
    this.keyPresses.push({
      key,
      timestamp: Date.now()
    });
  }

  analyzeTypingPattern() {
    if (this.keyPresses.length < 2) {
      return {
        averageSpeed: 0,
        consistency: 0,
        backspaceFrequency: 0,
        specialCharFrequency: 0
      };
    }

    // Calculate time intervals between keypresses
    const intervals = [];
    for (let i = 1; i < this.keyPresses.length; i++) {
      intervals.push(this.keyPresses[i].timestamp - this.keyPresses[i - 1].timestamp);
    }

    // Average typing speed (milliseconds between keypresses)
    const averageSpeed = intervals.reduce((a, b) => a + b, 0) / intervals.length;

    // Consistency (standard deviation of intervals)
    const mean = averageSpeed;
    const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
    const consistency = Math.sqrt(variance);

    // Backspace frequency
    const backspaceCount = this.keyPresses.filter(kp => kp.key === 'Backspace').length;
    const backspaceFrequency = backspaceCount / this.keyPresses.length;

    // Special character frequency
    const specialCharCount = this.keyPresses.filter(kp => /[!@#$%^&*(),.?":{}|<>]/.test(kp.key)).length;
    const specialCharFrequency = specialCharCount / this.keyPresses.length;

    return {
      averageSpeed,
      consistency,
      backspaceFrequency,
      specialCharFrequency,
      rawKeyPresses: this.keyPresses.map(kp => ({ key: kp.key, timestamp: kp.timestamp }))
    };
  }

  getRiskScore() {
    const pattern = this.analyzeTypingPattern();
    let riskScore = 0;

    if (pattern.backspaceFrequency > 0.2) riskScore += 20;
    if (pattern.consistency > 200) riskScore += 30;
    if (pattern.averageSpeed < 50) riskScore += 25;
    if (pattern.specialCharFrequency > 0.3) riskScore += 15;

    return Math.min(riskScore, 100);
  }

  generateBehavioralData(username) {
    const typingPattern = this.analyzeTypingPattern();
    const riskScore = this.getRiskScore();
    
    const behavioralData = {
      timestamp: new Date().toISOString(),
      username,
      sessionData: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        colorDepth: window.screen.colorDepth
      },
      typingAnalysis: {
        pattern: typingPattern,
        riskScore,
        totalKeyPresses: this.keyPresses.length,
        sessionDuration: Date.now() - this.startTime
      },
      securityMetrics: {
        isRisky: riskScore > 70,
        riskFactors: this.calculateRiskFactors(typingPattern)
      }
    };

    // Store the attempt locally
    this.loginAttempts.push(behavioralData);
    
    // Save to localStorage for persistence
    this.saveToLocalStorage();

    return behavioralData;
  }

  calculateRiskFactors(pattern) {
    const factors = [];
    
    if (pattern.averageSpeed < 50) factors.push('Unusually fast typing');
    if (pattern.consistency > 200) factors.push('Inconsistent typing pattern');
    if (pattern.backspaceFrequency > 0.2) factors.push('High correction rate');
    if (pattern.specialCharFrequency > 0.3) factors.push('Unusual special character usage');
    
    return factors;
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('loginAttempts', JSON.stringify(this.loginAttempts));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  getStoredAttempts() {
    try {
      const stored = localStorage.getItem('loginAttempts');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }
}

export const behavioralAnalyzer = new BehavioralAnalysis();