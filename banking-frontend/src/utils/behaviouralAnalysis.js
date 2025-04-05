class BehavioralAnalysis {
  constructor() {
    this.keyPresses = [];
    this.startTime = 0;
    this.loginAttempts = [];
    this.knownPatterns = {};
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
        specialCharFrequency: 0,
        patternDeviation: 0
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

    // Calculate pattern deviation from known patterns
    let patternDeviation = 1; // Default high deviation
    if (this.knownPatterns[this.keyPresses[0].key]) {
      const knownPattern = this.knownPatterns[this.keyPresses[0].key];
      // Compare current pattern with known pattern
      patternDeviation = Math.abs(averageSpeed - knownPattern.averageSpeed) / knownPattern.averageSpeed;
    }

    return {
      averageSpeed,
      consistency,
      backspaceFrequency,
      specialCharFrequency,
      patternDeviation,
      rawKeyPresses: this.keyPresses.map(kp => ({ key: kp.key, timestamp: kp.timestamp }))
    };
  }

  getRiskScore(isCorrectPassword) {
    const pattern = this.analyzeTypingPattern();
    let riskScore = 0;

    // If password is correct, we're more lenient with the risk assessment
    const backspaceThreshold = isCorrectPassword ? 0.3 : 0.2;
    const consistencyThreshold = isCorrectPassword ? 300 : 200;
    const speedThreshold = isCorrectPassword ? 40 : 50;
    
    // Adjust risk factors based on password correctness
    if (pattern.backspaceFrequency > backspaceThreshold) riskScore += 15;
    if (pattern.consistency > consistencyThreshold) riskScore += 20;
    if (pattern.averageSpeed < speedThreshold) riskScore += 15;
    if (pattern.specialCharFrequency > 0.3) riskScore += 10;
    
    // Add significant risk if password is incorrect
    if (!isCorrectPassword) {
      riskScore += 40; // Incorrect password is a major risk factor
    }
    
    // Add risk based on pattern deviation from known patterns
    if (pattern.patternDeviation > 0.5) {
      riskScore += 20 * pattern.patternDeviation;
    }

    // Cap the risk score at 100
    return Math.min(Math.round(riskScore), 100);
  }

  updateKnownPattern(username, isCorrectPassword) {
    // Only update known patterns for successful logins
    if (isCorrectPassword && this.keyPresses.length > 5) {
      const pattern = this.analyzeTypingPattern();
      this.knownPatterns[username] = {
        averageSpeed: pattern.averageSpeed,
        consistency: pattern.consistency,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  generateBehavioralData(username, isCorrectPassword) {
    const typingPattern = this.analyzeTypingPattern();
    const riskScore = this.getRiskScore(isCorrectPassword);
    
    // Update known patterns for this user if login is successful
    this.updateKnownPattern(username, isCorrectPassword);
    
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
        isRisky: riskScore > 60, // Adjusted threshold
        riskFactors: this.calculateRiskFactors(typingPattern, isCorrectPassword)
      }
    };

    // Store the attempt locally
    this.loginAttempts.push(behavioralData);
    
    // Save to localStorage for persistence
    this.saveToLocalStorage();

    return behavioralData;
  }

  calculateRiskFactors(pattern, isCorrectPassword) {
    const factors = [];
    
    if (pattern.averageSpeed < 50) factors.push('Unusually fast typing');
    if (pattern.consistency > 200) factors.push('Inconsistent typing pattern');
    if (pattern.backspaceFrequency > 0.2) factors.push('High correction rate');
    if (pattern.specialCharFrequency > 0.3) factors.push('Unusual special character usage');
    if (pattern.patternDeviation > 0.5) factors.push('Deviation from usual typing pattern');
    if (!isCorrectPassword) factors.push('Incorrect password');
    
    return factors;
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('loginAttempts', JSON.stringify(this.loginAttempts));
      localStorage.setItem('knownPatterns', JSON.stringify(this.knownPatterns));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  loadFromLocalStorage() {
    try {
      const storedAttempts = localStorage.getItem('loginAttempts');
      const storedPatterns = localStorage.getItem('knownPatterns');
      
      if (storedAttempts) {
        this.loginAttempts = JSON.parse(storedAttempts);
      }
      
      if (storedPatterns) {
        this.knownPatterns = JSON.parse(storedPatterns);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
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
// Load stored data when the module is imported
behavioralAnalyzer.loadFromLocalStorage();