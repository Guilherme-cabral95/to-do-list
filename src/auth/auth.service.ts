import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    
    private jwtService: JwtService
  ) {}


  
  async signIn() {
    
    const now = new Date()
    const payload = { sub: now };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}