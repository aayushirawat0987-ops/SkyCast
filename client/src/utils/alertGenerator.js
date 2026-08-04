/**
 * Severe Weather Alert Generator Utility
 * Evaluates live weather metrics & condition codes to compute severe weather warnings:
 * - Storm / High Wind
 * - Heavy Rain / Flash Flood
 * - Heatwave / Extreme Heat
 * - Snow / Blizzard
 * - Thunderstorm / Lightning
 */

export const getSevereWeatherAlerts = (weatherData) => {
  if (!weatherData) return [];

  const alerts = [];
  const {
    name,
    temp,
    condition = '',
    windSpeed = 0,
    uvIndex = 0,
    humidity = 0,
  } = weatherData;

  const condLower = condition.toLowerCase();

  // 1. THUNDERSTORM ALERT
  if (condLower.includes('thunderstorm') || condLower.includes('lightning')) {
    alerts.push({
      id: `alert-thunderstorm-${name}`,
      type: 'thunderstorm',
      severity: 'SEVERE WARNING',
      title: `Severe Thunderstorm Warning - ${name}`,
      description: `Active severe thunderstorm detected in ${name} with risk of frequent cloud-to-ground lightning and localized heavy downpours.`,
      advice: 'Seek sturdy indoor shelter immediately. Avoid tall trees and metal structures.',
      color: 'rose',
      bgColor: 'bg-rose-950/80',
      borderColor: 'border-rose-500/50',
      textColor: 'text-rose-200',
      badgeColor: 'bg-rose-500 text-white',
      icon: 'thunderstorm',
    });
  }

  // 2. STORM / HIGH WIND WARNING
  if (windSpeed >= 35 || condLower.includes('storm') || condLower.includes('gale') || condLower.includes('squall')) {
    alerts.push({
      id: `alert-storm-${name}`,
      type: 'storm',
      severity: 'HIGH WIND WARNING',
      title: `High Wind & Gale Force Storm Alert - ${name}`,
      description: `Sustained wind speeds reaching ${windSpeed} km/h in ${name}. Potential for falling tree limbs and structural debris.`,
      advice: 'Secure loose outdoor items. Drive with extreme caution on bridges and open highways.',
      color: 'purple',
      bgColor: 'bg-purple-950/80',
      borderColor: 'border-purple-500/50',
      textColor: 'text-purple-200',
      badgeColor: 'bg-purple-500 text-white',
      icon: 'wind',
    });
  }

  // 3. HEAVY RAIN / FLASH FLOOD ADVISORY
  if (condLower.includes('rain') || condLower.includes('drizzle') || humidity >= 85) {
    alerts.push({
      id: `alert-heavyrain-${name}`,
      type: 'heavy_rain',
      severity: 'FLOOD ADVISORY',
      title: `Heavy Downpour & Rain Advisory - ${name}`,
      description: `Continuous rainfall and high humidity (${humidity}%) creating slippery road surfaces and poor visibility in ${name}.`,
      advice: 'Maintain safe driving distances. Avoid driving through flooded underpasses.',
      color: 'amber',
      bgColor: 'bg-amber-950/80',
      borderColor: 'border-amber-500/50',
      textColor: 'text-amber-200',
      badgeColor: 'bg-amber-500 text-white',
      icon: 'rain-heavy',
    });
  }

  // 4. HEATWAVE / EXTREME HEAT WARNING
  if (temp >= 35 || uvIndex >= 9) {
    alerts.push({
      id: `alert-heatwave-${name}`,
      type: 'heatwave',
      severity: 'HEAT ADVISORY',
      title: `Extreme Heatwave & High UV Warning - ${name}`,
      description: `Temperatures recorded at ${temp}°C with UV Index of ${uvIndex} in ${name}. High risk of dehydration and heat exhaustion.`,
      advice: 'Stay hydrated, stay in air-conditioned environments, and apply broad-spectrum sunscreen.',
      color: 'orange',
      bgColor: 'bg-orange-950/80',
      borderColor: 'border-orange-500/50',
      textColor: 'text-orange-200',
      badgeColor: 'bg-orange-500 text-white',
      icon: 'sun',
    });
  }

  // 5. SNOW / BLIZZARD ALERT
  if (condLower.includes('snow') || condLower.includes('sleet') || condLower.includes('ice') || temp <= 2) {
    alerts.push({
      id: `alert-snow-${name}`,
      type: 'snow',
      severity: 'BLIZZARD & FREEZING ALERT',
      title: `Snowfall & Icy Conditions Warning - ${name}`,
      description: `Freezing temperatures (${temp}°C) and icy accumulation hazardous for travel in ${name}.`,
      advice: 'Dress in insulated layers. Equip vehicles with snow tires or tire chains.',
      color: 'cyan',
      bgColor: 'bg-cyan-950/80',
      borderColor: 'border-cyan-500/50',
      textColor: 'text-cyan-200',
      badgeColor: 'bg-cyan-500 text-white',
      icon: 'snow',
    });
  }

  return alerts;
};
