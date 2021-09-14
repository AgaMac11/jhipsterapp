jest.mock('@angular/router');
jest.mock('app/login/login.service');

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileInfo } from 'app/layouts/profiles/profile-info.model';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { LoginService } from 'app/login/login.service';

import { NavbarComponent } from './navbar.component';

describe('Component Tests', () => {
  describe('Navbar Component', () => {
    let comp: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let accountService: AccountService;
    let profileService: ProfileService;
    const account: Account = {
      activated: true,
      authorities: [],
      email: '',
      firstName: 'John',
      langKey: '',
      lastName: 'Doe',
      login: 'john.doe',
      imageUrl: '',
    };

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, NgxWebstorageModule.forRoot(), TranslateModule.forRoot()],
          declarations: [NavbarComponent],
          providers: [Router, LoginService],
        })
          .overrideTemplate(NavbarComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      comp = fixture.componentInstance;
      accountService = TestBed.inject(AccountService);
      profileService = TestBed.inject(ProfileService);
    });

    it('Should call profileService.getProfileInfo on init', () => {
      // GIVEN
      jest.spyOn(profileService, 'getProfileInfo').mockReturnValue(of(new ProfileInfo()));

      // WHEN
      comp.ngOnInit();

      // THEN
      // @ts-ignore
      expect(profileService.getProfileInfo).toHaveBeenCalled();
    });

    it('Should hold current authenticated user in variable account', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      // @ts-ignore
      expect(comp.account).toBeNull();

      // WHEN
      accountService.authenticate(account);

      // THEN
      expect(comp.account).equal(account);

      // WHEN
      accountService.authenticate(null);

      // THEN
      // @ts-ignore
      expect(comp.account).toBeNull();
    });

    it('Should hold current authenticated user in variable account if user is authenticated before page load', () => {
      // GIVEN
      accountService.authenticate(account);

      // WHEN
      comp.ngOnInit();

      // THEN
      // @ts-ignore
      expect(comp.account).toEqual(account);

      // WHEN
      accountService.authenticate(null);

      // THEN
      // @ts-ignore
      expect(comp.account).toBeNull();
    });
  });
});
